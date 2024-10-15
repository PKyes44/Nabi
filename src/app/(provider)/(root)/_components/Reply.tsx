import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { useQuery } from "@tanstack/react-query";

interface ReplyProps {
  reply: Tables<"replies">;
}

function Reply({ reply }: ReplyProps) {
  const { data: profile } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => clientApi.profiles.getProfileByUserId(reply.recipientId!),
  });

  return (
    <p>
      {profile?.nickname} : {reply.content}
    </p>
  );
}

export default Reply;
