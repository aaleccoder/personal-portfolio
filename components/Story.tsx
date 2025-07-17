import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useTranslations } from "next-intl";



export const Story = () => {
  const t = useTranslations("Story");
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

  return (
    <section className="w-full">
      <Tabs defaultValue="experiences">
        <TabsList className="flex flex-row justify-center mx-auto">
          <TabsTrigger value="experiences">{t("Experiences")}</TabsTrigger>
          <TabsTrigger value="education">{t("Education")}</TabsTrigger>
        </TabsList>
        <TabsContent value="experiences" className="w-full mx-auto space-y-4">
          {experiences.map((experience) => (
            <Card key={experience.id}>
              <CardHeader>
                <CardTitle>{experience.role}</CardTitle>
                <CardDescription>
                  <p>{experience.company}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{experience.duration}</p>
                <p className="mt-2">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="education" className="w-full mx-auto space-y-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader>
                <CardTitle>{edu.role}</CardTitle>
                <CardDescription>
                  <p>{edu.company}</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{edu.duration}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </section>

  )
}