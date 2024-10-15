interface ReplyProps {
  nickname?: string;
  content?: string;
}

function Reply({ nickname, content }: ReplyProps) {
  return (
    <p>
      {nickname} : {content}
    </p>
  );
}

export default Reply;
