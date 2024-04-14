import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';

export default async function RightSidebar(){
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) redirect('/onboarding');

    //fetch user data
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25
    })

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
      <h3 className="text-heading4-medium text-light-1">
                Suggested User
            </h3>

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0?(
            <p className="no-result">No users</p>
        ): (
            <>
            {result.users.map((person)=> (
                <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
                />
            ))}
            
            </>
        )} 
        </div>
      </div>
    </section>
  )
    }