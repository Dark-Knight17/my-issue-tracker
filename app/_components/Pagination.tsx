"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex, Select, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IssueQuery } from "../issues/IssueTable";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const onSelect = (pageSize: number) => {
    params.set("pageSize", pageSize.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="1">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            page size
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => onSelect(10)}>10</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => onSelect(15)}>15</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Text size="2">{pageSize} per page</Text>
    </Flex>
  );
};

export default Pagination;
