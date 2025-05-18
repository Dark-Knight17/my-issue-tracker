import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  comment: string;
  authorName: string;
}
const CommentCard = ({ comment, authorName: author }: Props) => {
  return (
    <Card>
      <Text>{comment}</Text>
      <Flex gap="1" align="center" mt="1">
        <DividerHorizontalIcon />
        <Text>{author}</Text>
      </Flex>
    </Card>
  );
};

export default CommentCard;
