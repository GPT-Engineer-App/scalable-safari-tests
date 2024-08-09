import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

const catBreeds = [
  { name: "Siamese", origin: "Thailand", temperament: "Vocal, Intelligent, Social", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", origin: "Iran", temperament: "Gentle, Quiet, Dignified", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", origin: "United States", temperament: "Friendly, Playful, Gentle", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", origin: "United Kingdom", temperament: "Calm, Patient, Intelligent", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Sphynx", origin: "Canada", temperament: "Energetic, Mischievous, Friendly", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
];

const CatBreedCard = ({ breed }) => (
  <Card className="mb-4 overflow-hidden">
    <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover" />
    <CardHeader>
      <CardTitle>{breed.name}</CardTitle>
      <CardDescription>Origin: {breed.origin}</CardDescription>
    </CardHeader>
    <CardContent>
      <p><strong>Temperament:</strong> {breed.temperament}</p>
    </CardContent>
  </Card>
);

const CatFact = ({ fact }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    className="bg-white p-4 rounded-lg shadow-md"
  >
    <p className="text-lg font-semibold">{fact}</p>
  </motion.div>
);

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [progress, setProgress] = useState(13);

  const catFacts = [
    "Cats sleep for about 70% of their lives.",
    "A group of cats is called a clowder.",
    "Cats have over 20 vocalizations, including the purr.",
    "The first cat in space was French. She was named Felicette.",
    "Cats can jump up to six times their length.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 13 : prevProgress + 1));
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-6xl font-bold mb-6 flex items-center justify-center text-purple-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Cat className="mr-2 text-pink-500" /> Feline Fascination
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A cute cat"
            className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-2xl mb-8"
          />
          <motion.div
            className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Paw className="text-pink-500 h-8 w-8" />
          </motion.div>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-800">Did You Know?</h2>
          <AnimatePresence mode="wait">
            <CatFact key={currentFactIndex} fact={catFacts[currentFactIndex]} />
          </AnimatePresence>
          <Progress value={progress} className="mt-4" />
        </div>

        <Tabs defaultValue="about" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="about">About Cats</TabsTrigger>
            <TabsTrigger value="breeds">Cat Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Feline Wonders</CardTitle>
                <CardDescription>Discover the magic of our feline friends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xl text-gray-700 mb-4">
                  Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
                </p>
                <h3 className="text-2xl font-semibold mb-3 text-purple-700">Characteristics of Cats</h3>
                <ul className="list-none mb-4 text-gray-700">
                  {["Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially their night vision", "Communicate through vocalizations, body language, and scent"].map((trait, index) => (
                    <motion.li 
                      key={index}
                      className="mb-2 flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Badge variant="outline" className="mr-2">{index + 1}</Badge>
                      {trait}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {catBreeds.map((breed, index) => (
                <motion.div
                  key={breed.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CatBreedCard breed={breed} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <Button 
            variant="outline" 
            className="flex items-center"
            onClick={() => setLikes(likes + 1)}
          >
            <Heart className="mr-2 h-4 w-4" /> Like
          </Button>
          <span className="text-2xl font-bold text-pink-500">{likes}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show your love for cats!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-gray-700 mb-4">
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
          </p>
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="text-yellow-400 h-6 w-6" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
