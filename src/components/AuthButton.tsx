import { logOut, getAuthorizationUrl, getUser } from "../auth";
import { Button, Flex } from "@radix-ui/themes";

export async function AuthButton({ large }: { large?: boolean }) {
  const { isAuthenticated } = await getUser();
  const authorizationUrl = await getAuthorizationUrl();

  if (isAuthenticated) {
    return (
      <Flex gap="3">
        <form
          action={async () => {
            "use server";
            
            await logOut();
          }}
        >
          <Button type="submit" size={large ? "3" : "2"}>
            Sign Out
          </Button>
        </form>
      </Flex>
    );
  }

  return (
    <Button asChild size={large ? "3" : "2"}>
      <a href={authorizationUrl}>Sign In {large && "with AuthKit"}</a>
    </Button>
  );
}