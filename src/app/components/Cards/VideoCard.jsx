import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
export default function VideoCard({title,price,des,imageUrl}) {
    
  return (
<div>
 <Card className="py-4 h-80 w-90 mr-10">
  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
    <p className="text-xs uppercase font-medium font-bold">{title}</p>
    <small className="text-default-500">{price}</small>
    <h4 className="font-bold text-sm">{des}</h4>
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
