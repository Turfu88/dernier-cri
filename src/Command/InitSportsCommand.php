<?php

namespace App\Command;

use App\Entity\Sport;
use Psr\Log\LoggerInterface;
use App\Service\ImportSports;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InitSportsCommand extends Command
{
    protected static $defaultName = 'import:data';
    
    private $logger;

    private $entityManager;

    private $client;

    private $test = true; // For tests only

    private $url = "https://sports-decathlon.herokuapp.com/api/v1/sports";
    
    private $sportsLimit = 20;

    public function __construct(LoggerInterface $logger, EntityManagerInterface $entityManager)
    {
        $this->logger = $logger;
        $this->entityManager = $entityManager;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // This command allows you to import Sport flux in your database with the command : php bin/console import:data
        $output->writeln('Start importing...');
        // $importSports = new ImportSports();
        // $importSports->importFlux();
        $this->importFlux();
        $output->writeln("Sports flux imported!");
        return Command::SUCCESS;
    }

    public function importFlux(){

        if($this->test)dump("Test mode");

        if(count($this->entityManager->getRepository(Sport::class)->findAll()) >= 0){
            dump("Flux already imported!");
            return;
        }
                     
        // 1 - Get data
        // For tests only : write content in a temporary file for a faster loading
        if($this->test){
            if(file_exists('tmp/content.json')){
                $content = file_get_contents('tmp/content.json');
            }else{
                $content = $this->getContent($this->url);
                file_put_contents('tmp/content.json', $content);
                dump("File content writen");
            }
        }else{
            $content = $this->getContent($this->url);
        }

        // 2 - Select sports from content
        $sports = $this->cleanAndSliceSports($content);
        $this->includeSportsInDatabase($sports);

    }

    private function getContent($url){
        $content = ""; 
        $response = $this->client->get($url); 
        while(!$content){
            $content = $response->getBody()->getContents();
        } 
        return $content;
    }

    private function cleanAndSliceSports($content){
        $elements = json_decode($content)->data;
        $cleanedSports = array();
        foreach ($elements as $element) {
            if($element->relationships->images->data && $element->relationships->images->data[0]->variants)$cleanedSports[] = $element;
        }

        return array_slice($cleanedSports, 0, $this->sportsLimit);
    }

    private function includeSportsInDatabase($sports){
        $em = $this->entityManager;
        foreach ($sports as $sport) {
            if($this->test)var_dump("------------------------");
            if($this->test)var_dump($sport->attributes->name);
            if($this->test)var_dump($sport->relationships->images->data[0]->url);
            if($this->test)var_dump($sport->relationships->images->data[0]->variants[0]->thumbnail->url);
            if($this->test)var_dump($sport->attributes->description);
            if($this->test)var_dump($sport->attributes->slug);

            $data = new Sport();
            $data->setName($sport->attributes->name);
            $data->setImage($sport->relationships->images->data[0]->url);
            $data->setThumbnail($sport->relationships->images->data[0]->variants[0]->thumbnail->url);
            $data->setDescription($sport->attributes->description);
            $data->setSlug($sport->attributes->slug);
            $data->setCreatedAt(new \DateTimeImmutable);
            $em->persist($data);
        }
        $em->flush();
    }
}
