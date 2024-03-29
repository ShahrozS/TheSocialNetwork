

import { fetchPostById } from '@/lib/actions/post.actions'
import { cn } from '@/lib/utils'
import toast, {type Toast} from 'react-hot-toast'



interface occupiedByToastprop {
    t:Toast;
    postId:string;
    postText:string;
    
}
const OccupiedByToast =  ({t,postId,postText}:occupiedByToastprop) =>{

    
     console.log("In Occupied Toas!!!" + postText);    
    return(

        <div className={cn(
            'max-wmd w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5',
            {'animate-enter':t.visible,'animate-leave':!t.visible}
        )}>
             <a onClick={() => toast.dismiss(t.id)} href={`/post/${postId}`}
             className='flex-1 w-0 p-4'
             >
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        
                    </div>

                    <div className="ml-3 flex-1">
                         <p className='text-sm font-medium text-gray-900'>A person just joined your {postText} activity! Open to look for new messages!</p>
                    
                    </div>
                </div>
             </a>
             <div className='flex border-l border-gray-200'>
        <button
          onClick={() => toast.dismiss(t.id)}
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
          Close
        </button>
      </div>

        </div>
    )

}

export default OccupiedByToast;