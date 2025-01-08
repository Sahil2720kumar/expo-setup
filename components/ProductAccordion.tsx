import { ChevronUpIcon, ChevronDownIcon, Truck, CornerDownLeft } from 'lucide-react-native';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  AccordionContent,
  AccordionContentText,
} from './ui/accordion';
import { Divider } from './ui/divider';

import { View } from 'react-native';
import React from 'react';
import { Text } from './ui/text';
import { CodIcon } from './Icons';

const ProductAccordion = () => {
  return (
    <Accordion variant="unfilled" type="single" isCollapsible={false} className="mt-5 w-[100%]">
      <AccordionItem value="item-1" className="rounded-lg">
        <AccordionHeader>
          <AccordionTrigger className="px-0">
            {({ isExpanded }) => {
              return (
                <>
                  <View className="flex-row gap-2">
                    <Truck size={18} color={'black'} />
                    <Text className="font-bold text-black">Free Flat Rate Shipping</Text>
                  </View>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="">
          <AccordionContentText>
            Estimated to be delivered on 15/07/2023 - 18/07/2023.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <Divider />
      <AccordionItem value="item-2" className="rounded-lg">
        <AccordionHeader>
          <AccordionTrigger className="px-0">
            {({ isExpanded }) => {
              return (
                <>
                  <View className="flex-row gap-2">
                    <CodIcon />
                    <Text className="font-bold text-black">COD Policy</Text>
                  </View>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            The Accordion component has three size variants - sm, md and lg.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
      <Divider />
      <AccordionItem value="item-3" className="rounded-lg">
        <AccordionHeader>
          <AccordionTrigger className="px-0">
            {({ isExpanded }) => {
              return (
                <>
                  <View className="flex-row gap-2">
                    <CornerDownLeft size={18} color={'black'} />
                    <Text className="font-bold text-black">Return Policy</Text>
                  </View>
                  {isExpanded ? (
                    <AccordionIcon as={ChevronUpIcon} />
                  ) : (
                    <AccordionIcon as={ChevronDownIcon} />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <AccordionContentText>
            Yes, you can nest your accordions. Refer to the nested accordion example in the docs.
          </AccordionContentText>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductAccordion;
