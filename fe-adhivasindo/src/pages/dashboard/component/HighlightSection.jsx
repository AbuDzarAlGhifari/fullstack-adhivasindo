import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

const HighlightSection = () => {
    return (
        <Card
            className="rounded-2xl overflow-hidden my-5 text-white relative shadow-lg"
            role="region"
            aria-label="Course card: Pemrograman Frontend Modern"
        >
            {/* background gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 opacity-95" />

            <CardContent className="relative ">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1 space-b-4">
                        <span className="inline-block text-lg text-yellow-500 font-medium tracking-wider uppercase opacity-95">
                            PEMROGRAMAN
                        </span>

                        <h3 className="text-xl md:text-3xl font-semibold leading-tight max-w-xl">
                            Pemrograman Frontend Modern
                            <br />
                            dengan React dan Angular
                        </h3>

                        <p className="text-sm opacity-90 max-w-md leading-relaxed">
                            Belajar framework web yang paling populer untuk
                            membangun pengalaman pengguna yang responsif dan
                            interaktif dengan teknologi terdepan dalam
                            pengembangan frontend modern.
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-6 text-sm mt-2">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" aria-hidden />
                                    <span className="opacity-95">
                                        Pemateri By Josep
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" aria-hidden />
                                    <span className="opacity-95">
                                        14-06-2025
                                    </span>
                                </div>
                            </div>
                            <Button
                                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-lg shadow-sm"
                                size="lg"
                                aria-label="Mulai Learning"
                            >
                                MULAI LEARNING
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HighlightSection;
