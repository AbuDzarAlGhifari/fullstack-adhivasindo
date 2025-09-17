import { Card, CardContent } from '@/components/ui/card';

const ModuleCard = ({ module }) => {
    const items = module.competencyItems ?? [];
    return (
        <Card className="overflow-hidden">
            <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${module.imageUrl})` }}
            >
                <div className="bg-black/30 h-full flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold px-4">
                        {module.title.toUpperCase()}
                    </h3>
                </div>
            </div>
            <CardContent className="p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {module.competencyTitle}
                </h4>
                <ul className="space-y-2">
                    {items.map((item, idx) => (
                        <li
                            key={idx}
                            className={`text-xs text-gray-600 p-2 rounded ${
                                module.highlightedIndex === idx
                                    ? 'bg-yellow-100'
                                    : ''
                            }`}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default ModuleCard;
