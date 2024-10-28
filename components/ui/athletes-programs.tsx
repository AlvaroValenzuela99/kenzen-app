import { getMyAthletes } from "@/lib/data"

export default async function AthletesPrograms({gymId}:{gymId: string;}) {
  const myAthletes = await getMyAthletes(gymId)
  console.log(myAthletes)
  
  return (
    <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
      <div className="bg-white px-6">
        {myAthletes?.map((athlete, i) => {
          return (
            <div key={athlete.athlete_id} className="flex flex-row items-center justify-between py-4">
              <p className="text-md font-semibold">{`${athlete?.first_name} ${athlete?.last_name}`}</p>
            </div>  
          )
        })}
      </div>      
    </div>
  )
}