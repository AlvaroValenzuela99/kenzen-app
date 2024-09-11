import AthleteSignup from "@/components/ui/athlete-signup-form";

export default function Page() {
    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="w-full max-w-sm space-y-2">
                            <AthleteSignup />
                        </div>
                    </div>
                </div>
            </section>
        </main>   
    )
}