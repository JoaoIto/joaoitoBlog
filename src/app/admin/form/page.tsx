"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../../../components/ui/atoms/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/atoms"
import { Input } from "../../../components/ui/atoms/input"
import { Label } from "../../../components/ui/atoms/label"
import { Textarea } from "../../../components/ui/atoms/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/atoms/tabs"
import { IArticle } from "@/app/interfaces/IArticles"
import { IProjeto } from "@/app/interfaces/IProjeto"
import { IEducation } from "@/app/interfaces/IEducation"
import { IExperience } from "@/app/interfaces/IExperiences"
import { useRouter } from "next/navigation"

const educationSchema = z.object({
  instituicao: z.string().min(1, "Instituição é obrigatória"),
  curso: z.string().min(1, "Curso é obrigatório"),
  periodo: z.string().min(1, "Período é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
})

const experienceSchema = z.object({
  cargo: z.string().min(1, "Cargo é obrigatório"),
  empresa: z.string().min(1, "Empresa é obrigatória"),
  periodo: z.string().min(1, "Período é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  tecnologias: z.string().min(1, "Tecnologias são obrigatórias"),
})

const projetoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  tecnologias: z.string().min(1, "Tecnologias são obrigatórias"),
  titulos: z.string().min(1, "Títulos são obrigatórios"),
  linkGit: z.string().url("Link do GitHub inválido").optional(),
  linkAcesso: z.string().url("Link de acesso inválido").optional(),
  dataCriacao: z.string().min(1, "Data de criação é obrigatória"),
})

const articleSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  areaEstudo: z.string().min(1, "Área de estudo é obrigatória"),
  dataPublicacao: z.string().min(1, "Data de publicação é obrigatória"),
  linkAcesso: z.string().url("Link de acesso inválido"),
})

type EducationFormData = z.infer<typeof educationSchema>
type ExperienceFormData = z.infer<typeof experienceSchema>
type ProjetoFormData = z.infer<typeof projetoSchema>
type ArticleFormData = z.infer<typeof articleSchema>

export default function AdminForms() {
  const router = useRouter();
  
  useEffect(() => {
    // Verifica se o usuário está autenticado ao carregar a página
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/admin/check-auth");
        const data = await response.json();
        
        // Verifica se o usuário está autenticado
        if (data.authenticated) {
          router.push("/admin/form"); // Usuário autenticado, direciona para o formulário
        } else {
          router.push("/admin/login"); // Não autenticado, direciona para a página de login
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/admin/login"); // Em caso de erro, redireciona para login
      }
    };

    checkAuth();
  }, [router]);

  const [activeTab, setActiveTab] = useState("education")

  const educationForm = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
  })

  const experienceForm = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
  })

  const projetoForm = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoSchema),
  })

  const articleForm = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  })

  const onSubmit = async (
    data: Partial<IArticle> | Partial<IProjeto> | Partial<IEducation> | Partial<IExperience>, 
    endpoint: string
  ) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Substitua pela URL padrão ou faça o fallback adequado
  
    try {
      const response = await fetch(`${apiUrl}/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dataPostagem: new Date().toISOString(),
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Falha ao enviar ${endpoint}`);
      }
  
      // Reset o formulário correspondente ao endpoint enviado
      switch (endpoint) {
        case "education":
          educationForm.reset();
          break;
        case "experiences":
          experienceForm.reset();
          break;
        case "projects":
          projetoForm.reset();
          break;
        case "articles":
          articleForm.reset();
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      <Card className="w-full max-w-4xl bg-card text-card-foreground shadow-md shadow-slate-400">
        <CardHeader>
          <CardTitle>Formulários de Administração</CardTitle>
          <CardDescription>Gerencie educação, experiência, projetos e artigos</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="education" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Educação
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Experiência
              </TabsTrigger>
              <TabsTrigger value="project" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Projeto
              </TabsTrigger>
              <TabsTrigger value="article" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Artigo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="education">
              <form onSubmit={educationForm.handleSubmit((data) => onSubmit(data, 'education'))} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="education-instituicao">Instituição</Label>
                    <Input id="education-instituicao" {...educationForm.register("instituicao")} className="bg-input text-foreground" />
                    {educationForm.formState.errors.instituicao && (
                      <p className="text-sm text-accent">{educationForm.formState.errors.instituicao.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="education-curso">Curso</Label>
                    <Input id="education-curso" {...educationForm.register("curso")} className="bg-input text-foreground" />
                    {educationForm.formState.errors.curso && (
                      <p className="text-sm text-accent">{educationForm.formState.errors.curso.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education-periodo">Período</Label>
                  <Input id="education-periodo" {...educationForm.register("periodo")} className="bg-input text-foreground" />
                  {educationForm.formState.errors.periodo && (
                    <p className="text-sm text-accent">{educationForm.formState.errors.periodo.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education-descricao">Descrição</Label>
                  <Textarea id="education-descricao" {...educationForm.register("descricao")} className="bg-input text-foreground" />
                  {educationForm.formState.errors.descricao && (
                    <p className="text-sm text-accent">{educationForm.formState.errors.descricao.message}</p>
                  )}
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar Educação
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="experience">
              <form onSubmit={experienceForm.handleSubmit((data) => onSubmit(data, 'experiences'))} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience-cargo">Cargo</Label>
                    <Input id="experience-cargo" {...experienceForm.register("cargo")} className="bg-input text-foreground" />
                    {experienceForm.formState.errors.cargo && (
                      <p className="text-sm text-accent">{experienceForm.formState.errors.cargo.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience-empresa">Empresa</Label>
                    <Input id="experience-empresa" {...experienceForm.register("empresa")} className="bg-input text-foreground" />
                    {experienceForm.formState.errors.empresa && (
                      <p className="text-sm text-accent">{experienceForm.formState.errors.empresa.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-periodo">Período</Label>
                  <Input id="experience-periodo" {...experienceForm.register("periodo")} className="bg-input text-foreground" />
                  {experienceForm.formState.errors.periodo && (
                    <p className="text-sm text-accent">{experienceForm.formState.errors.periodo.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-descricao">Descrição</Label>
                  <Textarea id="experience-descricao" {...experienceForm.register("descricao")} className="bg-input text-foreground" />
                  {experienceForm.formState.errors.descricao && (
                    <p className="text-sm text-accent">{experienceForm.formState.errors.descricao.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience-tecnologias">Tecnologias (separadas por vírgula)</Label>
                  <Input id="experience-tecnologias" {...experienceForm.register("tecnologias")} className="bg-input text-foreground" />
                  {experienceForm.formState.errors.tecnologias && (
                    <p className="text-sm text-accent">{experienceForm.formState.errors.tecnologias.message}</p>
                  )}
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar Experiência
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="project">
              <form onSubmit={projetoForm.handleSubmit((data) => onSubmit(data, 'projects'))} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-nome">Nome</Label>
                    <Input id="project-nome" {...projetoForm.register("nome")} className="bg-input text-foreground" />
                    {projetoForm.formState.errors.nome && (
                      <p className="text-sm text-accent">{projetoForm.formState.errors.nome.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-tecnologias">Tecnologias (separadas por vírgula)</Label>
                    <Input id="project-tecnologias" {...projetoForm.register("tecnologias")} className="bg-input text-foreground" />
                    {projetoForm.formState.errors.tecnologias && (
                      <p className="text-sm text-accent">{projetoForm.formState.errors.tecnologias.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-descricao">Descrição</Label>
                  <Textarea id="project-descricao" {...projetoForm.register("descricao")} className="bg-input text-foreground" />
                  {projetoForm.formState.errors.descricao && (
                    <p className="text-sm text-accent">{projetoForm.formState.errors.descricao.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-titulos">Títulos (separados por vírgula)</Label>
                  <Input id="project-titulos" {...projetoForm.register("titulos")} className="bg-input text-foreground" />
                  {projetoForm.formState.errors.titulos && (
                    <p className="text-sm text-accent">{projetoForm.formState.errors.titulos.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-linkGit">Link do GitHub (opcional)</Label>
                    <Input id="project-linkGit" {...projetoForm.register("linkGit")} className="bg-input text-foreground" />
                    {projetoForm.formState.errors.linkGit && (
                      <p className="text-sm text-accent">{projetoForm.formState.errors.linkGit.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-linkAcesso">Link de Acesso (opcional)</Label>
                    <Input id="project-linkAcesso" {...projetoForm.register("linkAcesso")} className="bg-input text-foreground" />
                    {projetoForm.formState.errors.linkAcesso && (
                      <p className="text-sm text-accent">{projetoForm.formState.errors.linkAcesso.message}</p>
                    
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-dataCriacao">Data de Criação</Label>
                  <Input id="project-dataCriacao" type="date" {...projetoForm.register("dataCriacao")} className="bg-input text-foreground" />
                  {projetoForm.formState.errors.dataCriacao && (
                    <p className="text-sm text-accent">{projetoForm.formState.errors.dataCriacao.message}</p>
                  )}
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar Projeto
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="article">
              <form onSubmit={articleForm.handleSubmit((data) => onSubmit(data, 'articles'))} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="article-nome">Nome</Label>
                    <Input id="article-nome" {...articleForm.register("nome")} className="bg-input text-foreground" />
                    {articleForm.formState.errors.nome && (
                      <p className="text-sm text-accent">{articleForm.formState.errors.nome.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="article-areaEstudo">Área de Estudo</Label>
                    <Input id="article-areaEstudo" {...articleForm.register("areaEstudo")} className="bg-input text-foreground" />
                    {articleForm.formState.errors.areaEstudo && (
                      <p className="text-sm text-accent">{articleForm.formState.errors.areaEstudo.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-descricao">Descrição</Label>
                  <Textarea id="article-descricao" {...articleForm.register("descricao")} className="bg-input text-foreground" />
                  {articleForm.formState.errors.descricao && (
                    <p className="text-sm text-accent">{articleForm.formState.errors.descricao.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-linkAcesso">Link de Acesso</Label>
                  <Input id="article-linkAcesso" {...articleForm.register("linkAcesso")} className="bg-input text-foreground" />
                  {articleForm.formState.errors.linkAcesso && (
                    <p className="text-sm text-accent">{articleForm.formState.errors.linkAcesso.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="article-dataPublicacao">Data de Publicação</Label>
                  <Input id="article-dataPublicacao" type="date" {...articleForm.register("dataPublicacao")} className="bg-input text-foreground" />
                  {articleForm.formState.errors.dataPublicacao && (
                    <p className="text-sm text-accent">{articleForm.formState.errors.dataPublicacao.message}</p>
                  )}
                </div>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Enviar Artigo
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>  
  )
}