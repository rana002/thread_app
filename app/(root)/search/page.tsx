
import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import UserCard from '@/components/cards/UserCard';

async function Page() {
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
    <section>
      <div>
      <h1 className="head-text mb-10">Search</h1>
      {/* search bar*/ }
      <input
          type="text"
          placeholder="Search users"
          name="search"
          className="mx-6 w-10/12 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
        typeof='submit'
        className="bg-white w-mid px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
Search
        </button>
      </div>
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
    </section>
  )
}

export default Page
