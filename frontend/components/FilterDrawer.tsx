import { CheckIcon, ChevronDownIcon, ChevronUpIcon, Filter } from 'lucide-react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { Button, ButtonText } from './ui/button';
import { Divider } from './ui/divider';
import { DrawerBackdrop, DrawerHeader, DrawerBody, DrawerContent, Drawer } from './ui/drawer';
import { HStack } from './ui/hstack';
import { VStack } from './ui/vstack';
import { Text } from './ui/text';
import {
  CheckboxGroup,
  Checkbox,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
} from './ui/checkbox';
import { Heading } from './ui/heading';
import { StatusBar, View } from 'react-native';
import { useBreakpointValue } from './ui/utils/use-break-point-value';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const clothBrands = [
  'Allen Solly',
  'Adidas',
  'Nike',
  'Marks & Spencer',
  'Puma',
  'Zara',
  'H&M',
  'Gap',
];
const genderAndAge = ['Men', 'Women', 'Kids'];
const clothingTypes = [
  { name: 'Tops', items: ['T-shirts', 'Shirts', 'Blouses', 'Tank Tops', 'Crop Tops'] },
  { name: 'Bottoms', items: ['Jeans', 'Trousers', 'Shorts', 'Skirts'] },
  { name: 'Dresses', items: ['Casual Dresses', 'Party Dresses', 'Maxi Dresses'] },
  { name: 'Outerwear', items: ['Jackets', 'Coats', 'Hoodies', 'Sweatshirts'] },
  { name: 'Activewear', items: ['Gym Wear', 'Yoga Wear', 'Sportswear'] },
  { name: 'Ethnic Wear', items: ['Sarees', 'Kurtas', 'Sherwanis', 'Lehenga Choli'] },
  { name: 'Sleepwear & Loungewear', items: ['Pajamas', 'Nightgowns', 'Robes'] },
  { name: 'Innerwear', items: ['Bras', 'Underwear', 'Socks'] },
];
const clothColors = [
  { name: 'White', value: 'white', colorCode: 'white' },
  { name: 'Black', value: 'black', colorCode: 'black' },
  { name: 'Red', value: 'red', colorCode: 'red' },
  { name: 'Brown', value: 'brown', colorCode: 'brown' },
  { name: 'Blue', value: 'blue', colorCode: 'blue' },
  { name: 'Gray', value: 'gray', colorCode: 'gray' },
  { name: 'Green', value: 'green', colorCode: 'green' },
  { name: 'Yellow', value: 'yellow', colorCode: 'yellow' },
  { name: 'Purple', value: 'purple', colorCode: 'purple' },
];

const clothPriceRanges = [
  { id: '1', name: 'Under ₹1640', min: 0, max: 1640 },
  { id: '2', name: '₹1640 - ₹4100', min: 1640, max: 4100 },
  { id: '3', name: '₹4100 - ₹8200', min: 4100, max: 8200 },
  { id: '4', name: 'Over ₹8200', min: 8200, max: Infinity },
];

const FilterDrawer = ({ handleProductsFilters }) => {
  // console.log('re render');
  const [showDrawer, setShowDrawer] = useState(false);
  const iconSize = useBreakpointValue({
    default: 20,
    sm: 24,
    md: 24,
  });
  // const [genderAndAgeCategories, setGenderAndAgeCategories] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [colors, setColors] = useState([]);

  const [filters, setFilters] = useState({
    priceRange: [],
    genderAndAgeCategories: [],
    categories: [],
    colors: [],
    brands: [],
  });

  // console.log(categories,brands,colors,genderAndAgeCategories)

  const handleOpenDrawer = useCallback(() => setShowDrawer(true), []);
  const handleCloseDrawer = useCallback(() => setShowDrawer(false), []);
  const handleClearAll = useCallback(() => {
    setFilters({
      priceRange: [],
      genderAndAgeCategories: [],
      categories: [],
      colors: [],
      brands: [],
    });
  }, []);

  const memorizedGenderAndAge = useMemo(() => genderAndAge, []);
  const memorizedClothingTypes = useMemo(() => clothingTypes, []);
  const memorizedClothColors = useMemo(() => clothColors, []);
  const memorizedClothPriceRanges = useMemo(() => clothPriceRanges, []);

  const handleApplyFilter = () => {
    // console.log(filters);
    handleProductsFilters(filters);
  };

  return (
    <>
      <Button
        size="lg"
        variant="solid"
        action="secondary"
        onPress={handleOpenDrawer}
        className="items-center  justify-center rounded-full bg-[#F1F1F1] p-[12]">
        <Filter size={iconSize} color="black" />
      </Button>
      <Drawer anchor="right" isOpen={showDrawer} onClose={handleCloseDrawer}>
        <DrawerBackdrop />
        <DrawerContent
          className="w-[270px] overflow-scroll px-4 py-3 pb-8 md:w-[300px]"
          style={{ paddingTop: StatusBar.currentHeight! + 10 }}>
          <DrawerHeader>
            <Heading size="md">FILTERS</Heading>
            <Button variant="link" size="xs" onPress={handleClearAll}>
              <ButtonText>Clear All</ButtonText>
            </Button>
          </DrawerHeader>
          <DrawerBody className="mb-0 mt-0 flex-grow gap-4 ">
            <Text className="py-3 text-left font-semibold text-[#888888]" size="lg">
              Apply filters to refine your product search.
            </Text>
            {/* Gender and Age Categories */}
            <VStack className="py-3 pl-2">
              <Accordion
                variant="unfilled"
                size="sm"
                isCollapsible={true}
                className="w-[100%] max-w-[640px]">
                <AccordionItem value="item-1" className="">
                  <AccordionHeader className="">
                    <AccordionTrigger className="px-0 py-0">
                      {({ isExpanded }) => {
                        return (
                          <>
                            <Text className="font-semibold">Gender and Age</Text>

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

                  <Divider className="my-1" />
                  <AccordionContent className=" px-0">
                    <CheckboxGroup
                      value={filters.genderAndAgeCategories}
                      onChange={(keys) =>
                        setFilters((prev) => ({ ...prev, genderAndAgeCategories: keys }))
                      }>
                      <VStack className="ml-1 mt-3 gap-3">
                        {memorizedGenderAndAge.map((category) => (
                          <HStack className="items-center gap-1" key={category}>
                            <Checkbox value={category} size="sm">
                              <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <CheckboxLabel>{category}</CheckboxLabel>
                            </Checkbox>
                          </HStack>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VStack>

            {/* Clothing Types */}
            <VStack className="py-3 pl-2">
              <Accordion variant="unfilled" size="sm" className="w-[100%] max-w-[640px]">
                <AccordionItem value="item-2" className="">
                  <AccordionHeader className="">
                    <AccordionTrigger className="px-0 py-0">
                      {({ isExpanded }) => {
                        return (
                          <>
                            <Text className="font-semibold">Clothing Types</Text>

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
                  <Divider className="my-1" />
                  <AccordionContent className=" px-0">
                    {clothingTypes.map(({ name, items }) => (
                      <VStack className="py-3 pl-2" key={name}>
                        {/* Sub Accordion for sub Category Product */}
                        <Accordion variant="unfilled" size="sm" className="w-[100%] max-w-[640px]">
                          <AccordionItem value="item-2" className="">
                            <AccordionHeader className="">
                              <AccordionTrigger className="px-0 py-0">
                                {({ isExpanded }) => {
                                  return (
                                    <>
                                      <Text className="font-semibold">{name}</Text>

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
                            {/* <Divider className="my-1" /> */}
                            <AccordionContent className=" px-0">
                              <CheckboxGroup
                                value={filters.categories}
                                onChange={(keys) =>
                                  setFilters((prev) => ({
                                    ...prev, // Spread previous state
                                    categories: keys, // Update only genderAndAgeCategories
                                  }))
                                }>
                                <VStack className="ml-1 mt-3 gap-3">
                                  {items.map((item) => (
                                    <HStack className="items-center gap-1" key={item}>
                                      <Checkbox value={item} size="sm">
                                        <CheckboxIndicator>
                                          <CheckboxIcon as={CheckIcon} />
                                        </CheckboxIndicator>
                                        <CheckboxLabel>{item}</CheckboxLabel>
                                      </Checkbox>
                                    </HStack>
                                  ))}
                                </VStack>
                              </CheckboxGroup>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </VStack>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VStack>

            {/* Brands */}
            <VStack className="py-3 pl-2">
              <Accordion variant="unfilled" size="sm" className="w-[100%] max-w-[640px]">
                <AccordionItem value="item-2" className="">
                  <AccordionHeader className="">
                    <AccordionTrigger className="px-0 py-0">
                      {({ isExpanded }) => {
                        return (
                          <>
                            <Text className="font-semibold">Brands</Text>

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
                  <Divider className="my-1" />
                  <AccordionContent className="px-0">
                    <CheckboxGroup
                      value={filters.brands}
                      onChange={(keys) => setFilters((prev) => ({ ...prev, brands: keys }))}>
                      <VStack className="ml-1 mt-3 gap-3">
                        {clothBrands.map((brand) => (
                          <HStack className="items-center gap-1" key={brand}>
                            <Checkbox value={brand} size="sm">
                              <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <CheckboxLabel>{brand}</CheckboxLabel>
                            </Checkbox>
                          </HStack>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VStack>

            {/* Price Range */}
            <VStack className="py-3 pl-2">
              <Accordion
                variant="unfilled"
                size="sm"
                isCollapsible={true}
                className="w-[100%] max-w-[640px]">
                <AccordionItem value="item-1" className="">
                  <AccordionHeader className="">
                    <AccordionTrigger className="px-0 py-0">
                      {({ isExpanded }) => {
                        return (
                          <>
                            <Text className="font-semibold">Price Range</Text>

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

                  <Divider className="my-1" />
                  <AccordionContent className=" px-0">
                    <CheckboxGroup
                      value={filters.priceRange}
                      onChange={(keys) => setFilters((prev) => ({ ...prev, priceRange: keys }))}>
                      <VStack className="ml-1 mt-3 gap-3">
                        {memorizedClothPriceRanges.map((category) => (
                          <HStack className="items-center gap-1" key={category.id}>
                            <Checkbox value={`${category.min}-${category.max}`} size="sm">
                              <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <CheckboxLabel>
                                Rs(₹) {category.min}-{category.max}
                              </CheckboxLabel>
                            </Checkbox>
                          </HStack>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VStack>

            {/* Colors */}
            <VStack className="py-3 pl-2">
              <Accordion variant="unfilled" size="sm" className="w-[100%] max-w-[640px]">
                <AccordionItem value="item-2" className="">
                  <AccordionHeader className="">
                    <AccordionTrigger className="px-0 py-0">
                      {({ isExpanded }) => {
                        return (
                          <>
                            <Text className="font-semibold">Colors</Text>

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
                  <Divider className="my-1" />
                  <AccordionContent className="px-0">
                    <CheckboxGroup
                      value={filters.colors}
                      onChange={(keys) => setFilters((prev) => ({ ...prev, colors: keys }))}>
                      <VStack className="ml-1 mt-3 gap-3">
                        {clothColors.map(({ name, value, colorCode }) => (
                          <HStack className="items-center gap-1" key={name}>
                            <Checkbox value={value} size="sm">
                              <CheckboxIndicator>
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <View className="flex flex-row items-center">
                                <View
                                  style={{
                                    backgroundColor: colorCode,
                                    borderWidth: colorCode === 'white' ? 1 : 0,
                                    borderColor: colorCode === 'white' ? 'black' : 'transparent',
                                  }}
                                  className={`mr-1 h-[18] w-[18] bg-${colorCode} text-${colorCode} rounded-full  border-black outline-none `}
                                />
                                <Text>{value}</Text>
                              </View>
                            </Checkbox>
                          </HStack>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VStack>
            <Button
              onPress={handleApplyFilter}
              className="mt-6 rounded-[10]"
              size="lg"
              variant="solid"
              action="primary">
              <ButtonText>Apply Filters</ButtonText>
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default memo(FilterDrawer);
