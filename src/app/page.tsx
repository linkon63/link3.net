"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Code2, 
  Check, 
  Copy, 
  ArrowRight, 
  ExternalLink,
  Zap,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const command = "npx shadcn@latest add button";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="text-lg font-semibold tracking-tight">NextStack</span>
            <Badge variant="secondary" className="ml-2 hidden sm:inline-flex text-xs font-medium">
              Next.js 15+ & Tailwind v4
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:flex items-center gap-1"
            >
              Docs <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <ModeToggle />
            <Button size="sm" className="gap-1.5 font-medium shadow-sm cursor-pointer">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Subtle Background Glows */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-20">
            <div className="h-[450px] w-[600px] rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-purple-500 blur-[120px]" />
          </div>

          <div className="container relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full border bg-muted/60 px-3.5 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
              <span>Production-ready Next.js + Tailwind CSS + shadcn/ui</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:leading-[1.1]">
              Craft modern web apps with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                shadcn/ui & Tailwind CSS
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Fully configured with App Router, TypeScript, dark mode theming, and an extensible suite of accessible UI components.
            </p>

            {/* Quick Copy Command */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="flex w-full sm:w-auto items-center justify-between rounded-lg border bg-muted/70 px-4 py-2 text-sm font-mono text-foreground backdrop-blur-sm">
                <span className="text-muted-foreground mr-2">$</span>
                <span>{command}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 ml-3 cursor-pointer"
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span className="sr-only">Copy command</span>
                </Button>
              </div>

              <Button size="lg" className="w-full sm:w-auto font-semibold cursor-pointer">
                Explore Components
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border/60 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Cpu className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">Next.js 15+ App Router</CardTitle>
                <CardDescription>
                  Harness server components, nested layouts, and streaming out-of-the-box.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Palette className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">Tailwind CSS v4</CardTitle>
                <CardDescription>
                  Ultra-fast compilation, modern CSS variables, and seamless dark mode support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/60 shadow-sm hover:shadow-md transition-all">
              <CardHeader className="space-y-1">
                <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                  <Layers className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">shadcn/ui Built-in</CardTitle>
                <CardDescription>
                  Accessible UI primitives beautifully styled and fully customizable in your codebase.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Interactive Component Demo Section */}
        <section className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Interactive Component Showcase</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Preview installed components working live in your browser.
            </p>
          </div>

          <Card className="border-border/60 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Live Component Playground</CardTitle>
              <CardDescription>Switch tabs to explore various UI elements.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="buttons" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
                  <TabsTrigger value="buttons">Buttons</TabsTrigger>
                  <TabsTrigger value="forms">Forms & Inputs</TabsTrigger>
                  <TabsTrigger value="dialogs">Dialogs & Modals</TabsTrigger>
                </TabsList>

                {/* Buttons Tab */}
                <TabsContent value="buttons" className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </TabsContent>

                {/* Forms Tab */}
                <TabsContent value="forms" className="space-y-4">
                  <div className="grid gap-4 max-w-md">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address</label>
                      <Input type="email" placeholder="name@example.com" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project Name</label>
                      <Input placeholder="My Next App" />
                    </div>
                    <Button className="w-full sm:w-auto">Submit Form</Button>
                  </div>
                </TabsContent>

                {/* Dialogs Tab */}
                <TabsContent value="dialogs" className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Click below to trigger a modal dialog styled with Tailwind CSS and shadcn/ui.
                  </p>
                  <Dialog>
                    <DialogTrigger
                      render={
                        <Button variant="outline" className="cursor-pointer">
                          Open Demo Dialog
                        </Button>
                      }
                    />
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Ready to build?</DialogTitle>
                        <DialogDescription>
                          You can customize this modal or add more shadcn/ui components anytime.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <div className="flex items-center gap-4 rounded-lg border p-4 bg-muted/40">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">shadcn/ui</h4>
                            <p className="text-xs text-muted-foreground">
                              The open source UI component library.
                            </p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Got it</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto flex flex-col sm:flex-row max-w-6xl items-center justify-between gap-4 px-4 text-center sm:px-6 lg:px-8 sm:text-left">
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS & shadcn/ui.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>TypeScript</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Tailwind CSS v4</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Lucide Icons</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
