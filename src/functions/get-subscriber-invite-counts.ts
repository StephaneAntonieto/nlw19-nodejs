import { redis } from "../redis/client";

interface GetSubscriberInviteCountsParams {
  subscriberId: string;
}

export async function getSubscriberInviteCounts({
  subscriberId,
}: GetSubscriberInviteCountsParams) {
  const count = await redis.zscore("referral:ranking", subscriberId);

  return { count: count ? Number.parseInt(count) : 0 };
}
