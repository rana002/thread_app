// Page.js
import PostAlert from '@/components/forms/PostAlert';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text">Create Scam Alert</h1>
      <PostAlert userId={userInfo._id}/>
    </>
  )
}

export default Page;