"use client";
import { Button, Card, Spinner, TextArea, Text } from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";

interface Props {
  issueId: number;
  authorId: string;
  onSuccess(): void;
}

const PostComment = ({ issueId, authorId, onSuccess }: Props) => {
  const [comment, setComment] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const postComment = async () => {
    setPosting(true);
    if (!comment.trim()) return;

    setPosting(true);
    setError(""); // Clear previous error

    try {
      const body = {
        comment,
        issueId,
        authorId,
      };
      await axios.post(`/api/issues/${issueId}/comments`, body);
      setComment(""); // Clear input on success
      onSuccess?.();
    } catch {
      setError("Something went wrong.");
    } finally {
      setPosting(false);
    }
  };
  return (
    <Card>
      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="make a comment…"
      />
      <Button mt="2" onClick={postComment} disabled={posting}>
        Post {posting && <Spinner />}
      </Button>
      {error && (
        <Text color="red" mt="2">
          {error}
        </Text>
      )}
    </Card>
  );
};

export default PostComment;
