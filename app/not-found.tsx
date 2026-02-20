import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
            <h2 className="text-h1 text-primary mb-2 font-bold">Página en Construcción</h2>
            <p className="text-bodyMedium text-grayContent mb-6">
                Lo sentimos, esta sección aún no está disponible en la versión beta.
            </p>
            <Link href="/">
                <Button label="Volver" variant="primary" />
            </Link>
        </div>
    );
}