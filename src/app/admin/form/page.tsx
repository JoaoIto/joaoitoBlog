"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const articleSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  areaEstudo: z.string().min(1, "Área de estudo é obrigatória"),
  dataPublicacao: z.string().min(1, "Data de publicação é obrigatória"),
  linkAcesso: z.string().url("Link de acesso inválido"),
})

const projetoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  tecnologias: z.string().min(1, "Tecnologias são obrigatórias"),
  linkGit: z.string().url("Link do GitHub inválido").optional(),
  linkAcesso: z.string().url("Link de acesso inválido").optional(),
  dataCriacao: z.string().min(1, "Data de criação é obrigatória"),
})

type ArticleFormData = z.infer<typeof articleSchema>
type ProjetoFormData = z.infer<typeof projetoSchema>

export default function AdminForms() {
  const [activeTab, setActiveTab] = useState("article")

  const articleForm = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
  })

  const projetoForm = useForm<ProjetoFormData>({
    resolver: zodResolver(projetoSchema),
  })

  const onArticleSubmit = async (data: ArticleFormData) => {
    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dataPostagem: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar o artigo")
      }

      Toast({
        title: "Artigo enviado com sucesso!",
      })
      articleForm.reset()
    } catch (error) {
      console.log(error);
      Toast({
        title: "Erro ao enviar o artigo",
        variant: "destructive",
      })
    }
  }

  const onProjetoSubmit = async (data: ProjetoFormData) => {
    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          tecnologias: data.tecnologias.split(",").map((tech) => tech.trim()),
          dataPostagem: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar o projeto")
      }

      Toast({
        title: "Projeto enviado com sucesso!",
        
      })
      projetoForm.reset()
    } catch (error) {
      console.log(error);
      Toast({
        title: "Erro ao enviar o projeto",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="sm:w-3/4 lg:w-1/2 m-4 bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Formulários de Administração</CardTitle>
        <CardDescription>Gerencie artigos e projetos</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="article" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Artigo</TabsTrigger>
            <TabsTrigger value="project" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Projeto</TabsTrigger>
          </TabsList>
          <TabsContent value="article">
            <form onSubmit={articleForm.handleSubmit(onArticleSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="article-nome">Nome</Label>
                <Input id="article-nome" {...articleForm.register("nome")} className="bg-input text-foreground" />
                {articleForm.formState.errors.nome && (
                  <p className="text-sm text-accent">{articleForm.formState.errors.nome.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="article-descricao">Descrição</Label>
                <Textarea id="article-descricao" {...articleForm.register("descricao")} className="bg-input text-foreground" />
                {articleForm.formState.errors.descricao && (
                  <p className="text-sm text-accent">{articleForm.formState.errors.descricao.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="article-areaEstudo">Área de Estudo</Label>
                <Input id="article-areaEstudo" {...articleForm.register("areaEstudo")} className="bg-input text-foreground" />
                {articleForm.formState.errors.areaEstudo && (
                  <p className="text-sm text-accent">{articleForm.formState.errors.areaEstudo.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="article-dataPublicacao">Data de Publicação</Label>
                <Input
                  id="article-dataPublicacao"
                  type="date"
                  {...articleForm.register("dataPublicacao")}
                  className="bg-input text-foreground"
                />
                {articleForm.formState.errors.dataPublicacao && (
                  <p className="text-sm text-accent">{articleForm.formState.errors.dataPublicacao.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="article-linkAcesso">Link de Acesso</Label>
                <Input id="article-linkAcesso" {...articleForm.register("linkAcesso")} className="bg-input text-foreground" />
                {articleForm.formState.errors.linkAcesso && (
                  <p className="text-sm text-accent">{articleForm.formState.errors.linkAcesso.message}</p>
                )}
              </div>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Enviar Artigo</Button>
            </form>
          </TabsContent>
          <TabsContent value="project">
            <form onSubmit={projetoForm.handleSubmit(onProjetoSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-nome">Nome</Label>
                <Input id="project-nome" {...projetoForm.register("nome")} className="bg-input text-foreground" />
                {projetoForm.formState.errors.nome && (
                  <p className="text-sm text-accent">{projetoForm.formState.errors.nome.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-descricao">Descrição</Label>
                <Textarea id="project-descricao" {...projetoForm.register("descricao")} className="bg-input text-foreground" />
                {projetoForm.formState.errors.descricao && (
                  <p className="text-sm text-accent">{projetoForm.formState.errors.descricao.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-tecnologias">Tecnologias (separadas por vírgula)</Label>
                <Input id="project-tecnologias" {...projetoForm.register("tecnologias")} className="bg-input text-foreground" />
                {projetoForm.formState.errors.tecnologias && (
                  <p className="text-sm text-accent">{projetoForm.formState.errors.tecnologias.message}</p>
                )}
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="project-dataCriacao">Data de Criação</Label>
                <Input
                  id="project-dataCriacao"
                  type="date"
                  {...projetoForm.register("dataCriacao")}
                  className="bg-input text-foreground"
                />
                {projetoForm.formState.errors.dataCriacao && (
                  <p className="text-sm text-accent">{projetoForm.formState.errors.dataCriacao.message}</p>
                )}
              </div>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Enviar Projeto</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}