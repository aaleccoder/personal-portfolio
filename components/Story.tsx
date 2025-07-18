import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Proyects } from "./Proyects";

export const Story = () => {
  const t = useTranslations("Story");
  const [activeTab, setActiveTab] = useState("experiences");

  const experiences = [
    {
      id: 1,
      company: "Company A",
      role: "Frontend Developer",
      duration: "Jan 2020 - Present",
      description: "Worked on building responsive web applications.",
    },
    {
      id: 2,
      company: "Company B",
      role: "Backend Developer",
      description: "Worked on API development and database management.",
      duration: "Jan 2019 - Dec 2019",
      skills: [
        {
          "React": "React"
        },
        {
          "TypeScript": "React"
        }
      ]
    },
  ]
  const education = [
    {
      id: 1,
      company: "University A",
      role: "BSc Computer Science",
      duration: "2015 - 2019",
    },
    {
      id: 2,
      company: "High School B",
      role: "High School Diploma",
      duration: "2011 - 2015",
    },
  ]

  const tabContentVariants = {
    active: { opacity: 1, y: 0 },
    inactive: { opacity: 0, y: 10 },
  };

  return (
    <section className="w-full space-y-4">
      <p className="text-center text-xl text-muted-foreground md:hidden">Past Experiences</p>
      <Tabs defaultValue="experiences" onValueChange={setActiveTab}>
        <TabsList className="flex flex-row justify-center mx-auto">
          <TabsTrigger value="experiences">{t("Experiences")}</TabsTrigger>
          <TabsTrigger value="education">{t("Education")}</TabsTrigger>
        </TabsList>
        <motion.div
          key="experiences"
          variants={tabContentVariants}
          animate={activeTab === "experiences" ? "active" : "inactive"}
          transition={{ duration: 0.5 }}
        >
          <TabsContent value="experiences" className="w-full mx-auto space-y-4">
            {experiences.map((experience) => (
              <Card key={experience.id} className="bg-transparent border-none shadow-none hover:bg-gradient-to-b from-primary/50 to-primary/30 hover:shadow-md shadow-white hover:border-8 hover:border-white cursor-pointer grid md:grid-cols-4 gap-0">
                <CardHeader className="flex-shrink-0 w-auto flex items-start">
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{experience.duration}</p>
                </CardHeader>
                <div className="col-span-3">
                  <CardHeader>
                    <CardTitle>{experience.role}</CardTitle>
                    <CardDescription>
                      <p>{experience.company}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mt-2">{experience.description}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </TabsContent >
        </motion.div>
        <motion.div
          key="education"
          variants={tabContentVariants}
          animate={activeTab === "education" ? "active" : "inactive"}
          transition={{ duration: 0.5 }}
        >
          <TabsContent value="education" className="w-full mx-auto space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="bg-transparent border-none shadow-none hover:bg-gradient-to-b from-primary/50 to-primary/30 hover:shadow-md shadow-white hover:border-8 hover:border-white cursor-pointer grid md:grid-cols-4 gap-0">
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-nowrap">{edu.duration}</p>
                </CardContent>
                <CardHeader className="col-span-3">
                  <CardTitle>{edu.role}</CardTitle>
                  <CardDescription>
                    <p>{edu.company}</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>
        </motion.div>
        {/* <motion.div key="projects"
          variants={tabContentVariants}
          animate={activeTab === "projects" ? "active" : "inactive"}
          transition={{ duration: 0.5 }}>
          <TabsContent value="projects" className="w-full mx-auto space-y-4">
            <Proyects />
          </TabsContent>
        </motion.div> */}
      </Tabs>
    </section>
  )
}