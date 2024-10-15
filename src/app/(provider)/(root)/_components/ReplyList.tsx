interface ReplyListProps {
  replies: {
    content: string;
    createdAt: string;
    recipientId: string;
    recruitId: string;
    replyId: string;
    userProfiles: {
      nickname: string;
    } | null;
  }[];
}

function ReplyList({ replies }: ReplyListProps) {
  return (
    <ul className="mt-5">
      {replies.map((reply) => (
        <li key={reply.replyId}>
          <p>
            {reply.userProfiles?.nickname} : {reply.content}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ReplyList;
