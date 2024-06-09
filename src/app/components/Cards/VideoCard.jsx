import React from 'react'
import { useRouter } from 'next/navigation';
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

export default function VideoCard({id ,title,price,des,imageUrl}) {
  const router = useRouter();
  const handlePress = () => {
    console.log(id);
    router.push(`/Info/${id}`);
  }
  return (
    <div>
      <Card isPressable="true" onPress={() => handlePress()} className="py-4 h-80 w-90 mr-10 mb-10 font-sans">
    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-64">
        <p className="text-xs uppercase truncate max-w-[280px] font-bold">{title}</p>
    </CardHeader>
    <CardBody className="overflow-visible py-2">
        <Image
            alt="Card background"
            className='object-cover rounded-xl h-80 '
            src={imageUrl}
            width={280}
        />
    </CardBody>
</Card>

    </div>
  )
}
