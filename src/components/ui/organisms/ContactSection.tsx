'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/atoms/input'
import { Textarea } from '@/components/ui/atoms/textarea'
import { Button } from '@/components/ui/atoms/button'
import { Github, Linkedin, Mail, Send, CheckCircle2 } from 'lucide-react'
import * as z from 'zod'

const contactFormSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  mensagem: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
})

type ContactFormInputs = z.infer<typeof contactFormSchema>

export const ContactSection: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setSubmitting(true)
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        setSuccess(true)
        reset()
        setTimeout(() => setSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-2">Fale comigo</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Entre em Contato</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Tem um projeto em mente? Entre em contato — responderei em até 24h.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: info */}
          <motion.div
            className="flex flex-col justify-center gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Vamos trabalhar juntos!</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Seja para um novo projeto, consultoria, ou apenas para bater um papo sobre tecnologia — me manda uma mensagem.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: 'joaovictorpfr@gmail.com', href: 'mailto:joaovictorpfr@gmail.com' },
                { icon: Github, label: 'github.com/JoaoIto', href: 'https://github.com/JoaoIto' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/jo%C3%A3o-victor-p%C3%B3voa-fran%C3%A7a-97502420b/' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm group"
                >
                  <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                    <Icon size={16} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {success ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                <CheckCircle2 size={48} className="text-green-500" />
                <p className="text-slate-700 dark:text-slate-300 font-medium text-center">
                  Mensagem enviada com sucesso! Obrigado, retornarei em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Input
                    {...register('nome')}
                    placeholder="Seu nome"
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome.message}</p>}
                </div>
                <div>
                  <Input
                    {...register('email')}
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Textarea
                    {...register('mensagem')}
                    placeholder="Descreva seu projeto ou dúvida..."
                    rows={5}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none"
                  />
                  {errors.mensagem && <p className="text-red-500 text-xs mt-1">{errors.mensagem.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      <Send size={16} />
                      Enviar mensagem
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}