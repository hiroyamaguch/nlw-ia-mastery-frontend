import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button";
import { Github, Wand2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from 'ai/react'

export function App() {
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string | null>()

  const { input, setInput, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <header className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl">upload.ai</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido com 💜 no NLW Rocketseat
            </span>

            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para IA..."
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA..."
                value={completion}
                readOnly
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo do vídeo selecionado.
            </p>
          </div>
          <aside className="flex flex-col w-80 space-y-6">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Prompt</Label>

                <PromptSelect onPromptSelected={setInput} />

                <span className="block text-xs italic text-muted-foreground">
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>

                <Select defaultValue="gpt3.5" disabled>
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>

                <span className="block text-xs italic text-muted-foreground">
                  Você poderá customizar essa opção em breve
                </span>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Temperatura</Label>

                <Slider
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={value => setTemperature(value[0])}
                />

                <span className="block text-xs italic text-muted-foreground">
                  Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros
                </span>

                <Separator />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  Executar
                  <Wand2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  )
}