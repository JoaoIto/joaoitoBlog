
import { useForm } from 'react-hook-form';
import {Card, CardContent} from "@/components/ui/atoms";
import {Input} from "@/components/ui/atoms/input";
import {Textarea} from "@/components/ui/atoms/textarea";
import {Button} from "@/components/ui/atoms/button";
import * as z from "zod";

const contactFormSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Endereço de email inválido"),
    mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
})
export const ContactSection: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
        try {
            const response = await fetch("/api/email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                alert("Email enviado com sucesso!")
            } else {
                alert("Erro ao enviar o email.")
            }
        } catch (error) {
            console.error("Erro ao enviar email:", error)
            alert("Erro ao enviar o email.")
        }
    }

    return (
        <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-[#ccd6f6]">
                Contato
            </h2>
            <p className="text-lg mb-6 text-gray-700 dark:text-[#a8b2d1]">
                Tem um projeto em mente? Precisa de ajuda para transformar sua ideia em realidade?
                Entre em contato agora e vamos trabalhar juntos para construir algo incrível!
            </p>
            <Card className="backdrop-blur-lg bg-black bg-opacity-40 border-2 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Input
                                placeholder="Nome"
                                {...register("nome", { required: "O nome é obrigatório." })}
                                className="bg-white/50 dark:bg-[#0a192f]/50 border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#64ffda] focus:border-transparent"
                            />
                            {errors.nome && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.nome.message}</p>}
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: "O email é obrigatório." })}
                                className="bg-white/50 dark:bg-[#0a192f]/50 border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#64ffda] focus:border-transparent"
                            />
                            {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Textarea
                                placeholder="Mensagem"
                                {...register("mensagem", { required: "A mensagem é obrigatória." })}
                                className="bg-white/50 dark:bg-[#0a192f]/50 border-gray-300 dark:border-[#233554] text-gray-900 dark:text-[#ccd6f6] focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#64ffda] focus:border-transparent"
                            />
                            {errors.mensagem && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.mensagem.message}</p>}
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-[#64ffda] dark:text-[#0a192f] dark:hover:bg-[#64ffda]/80 transition-colors duration-300"
                        >
                            Enviar Mensagem
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};
