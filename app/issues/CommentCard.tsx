import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { format } from "date-fns";

interface Props {
  comment: string;
  authorName: string;
  createdAt: string | Date;
}
const CommentCard = ({ comment, authorName: author, createdAt }: Props) => {
  const formattedDate = format(new Date(createdAt), "MMMM d, yyyy 'at' h:mm a");
  return (
    <Card>
      <Text>{comment}</Text>
      <Flex gap="1" align="center" mt="1" justify="between">
        <Box>
          <DividerHorizontalIcon className="inline" />
          <Text>{author}</Text>
        </Box>
        <Text color="gray" ml="2" size="1">
          • {formattedDate}
        </Text>
      </Flex>
    </Card>
  );
};

export default CommentCard;
