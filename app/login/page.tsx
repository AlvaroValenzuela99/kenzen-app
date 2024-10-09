import LoginForm from "@/components/ui/login-form"

export default function Page() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4">
                  <div className="w-full max-w-sm space-y-2">
                      <LoginForm />
                  </div>
              </div>
          </div>
      </section>
    </main>  
  )
}