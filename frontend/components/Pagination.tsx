import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from './ui/text';

const Pagination = ({ totalPages }) => {
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 5;

  // Update the visible range when the current page changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page >= startPage + pageLimit) {
      setStartPage(page - pageLimit + 1);
    } else if (page < startPage) {
      setStartPage(page);
    }
  };

  const renderPages = () => {
    const pages = [];
    for (let i = startPage; i < startPage + pageLimit && i <= totalPages; i++) {
      pages.push(
        <Pressable
          key={i}
          className="h-[40] w-[40] items-center justify-center rounded-full"
          style={{ backgroundColor: i === currentPage ? '#F93C00' : '#fff' }}
          onPress={() => handlePageChange(i)}>
          <Text style={{ color: i === currentPage ? '#fff' : '#888888' }}>{i}</Text>
        </Pressable>
      );
    }
    return pages;
  };

  return (
    <View className="flex flex-row items-center gap-x-2">
      {/* Back Button */}
      <Pressable
        className="h-[40] w-[40] items-center justify-center rounded-full"
        onPress={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}>
        <ChevronLeft size={16} color={currentPage === 1 ? '#ccc' : '#888888'} />
      </Pressable>

      {/* Page Numbers */}
      {renderPages()}

      {/* Next Button */}
      <Pressable
        className="h-[40] w-[40] items-center justify-center rounded-full"
        onPress={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}>
        <ChevronRight size={16} color={currentPage === totalPages ? '#ccc' : '#888888'} />
      </Pressable>
      {/* <Text>{currentPage}</Text> */}
    </View>
  );
};

export default Pagination;
