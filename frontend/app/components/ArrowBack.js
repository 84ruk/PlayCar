
'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ArrowBackIcon from '../../public/arrowback.svg';

export default function BackButton({ lastRoute }) {
  const router = useRouter();

  const handleGoBack = () => {
    // In Next.js 13, router.back() has been replaced by router.push('/');
    router.push(`${lastRoute}`);
  };

  return (
    <div className="flex items-center mb-5">
      <Link href={ lastRoute } onClick={handleGoBack} className="mr-2">
        <Image src={ArrowBackIcon} alt="Arrow Back" width={25} height={25} />
      </Link>
      <p>Regresar</p>
    </div>
  );
};

