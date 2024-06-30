"use client";

import { article_store, user_reads_notes } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CURRENT_USER } from "@/constants/user";
import { Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { WantToReadContainer } from "@/app/home/want2read/page";
import { WantToReadModal } from "@/app/home/want2read/newItemForm";
import {
  AddCurrentlyReadingModal,
  MoveToCurrentlyReadingModal,
} from "@/app/home/currentlyreading/newItemForm";
import { MenuAction } from "@/types/menuAction";

export function ArticleItem({
  item,
  ActionsRenderer,
}: {
  item: article_store & {
    user_reads_notes: user_reads_notes[];
  };
  ActionsRenderer?: () => JSX.Element;
}) {
  return (
    <div className="flex flex-row justify-between items-center border-t-2 border-b-2">
      <Button asChild variant="ghost">
        <Link
          href={`../read/${item.recordid}`}
          className="text-wrap hover:bg-slate-100"
        >
          {item.title}
        </Link>
      </Button>
      {ActionsRenderer && <ActionsRenderer />}
    </div>
  );
}

export function ArticleItemWithMenu({
  item,
  actions,
}: {
  item: article_store & {
    user_reads_notes: user_reads_notes[];
  };
  actions: MenuAction[];
}) {
  return (
    <ArticleItem
      item={item}
      ActionsRenderer={() => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {actions.map((action) => (
              <DropdownMenuItem asChild>
                {action.link ? (
                  <Link href={action.link}>{action.name}</Link>
                ) : (
                  action.name
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    />
  );
}

// interface MenuAction {
//   name: string;
//   link?: string;
//   onClick?: () => void;
//   Modal?: ({
//     open,
//     setOpen,
//   }: {
//     open: boolean;
//     setOpen: Dispatch<SetStateAction<boolean>>;
//   }) => JSX.Element;
// }

// export function WantToReadSection({
//   articleItems,
// }: {
//   articleItems: (article_store & {
//     user_reads_notes: user_reads_notes[];
//   })[];
// }) {
//   return (
//     <>
//       {articleItems.map((item) => (
//         <WantToReadArticleMenu
//           item={item}
//           actions={[
//             {
//               name: "View Article",
//               link: `/read/${item.recordid}`,
//             },
//             {
//               name: "View Notes",
//               link: `/read/${item.recordid}/${CURRENT_USER}`,
//             },
//             {
//               name: "Move to Currently Reading",
//               Modal: ({ open, setOpen }) => (
//                 <MoveToCurrentlyReadingModal
//                   article={item.recordid}
//                   open={open}
//                   setOpen={setOpen}
//                 />
//               ),
//             },
//           ]}
//         />
//       ))}
//     </>
//   );
// }

// export function WantToReadArticleMenu({
//   item,
//   actions,
// }: {
//   item: article_store & {
//     user_reads_notes: user_reads_notes[];
//   };
//   actions: MenuAction[];
// }) {
//   const [open, setOpen] = useState({
//     open: false,
//     Modal: (props: { open: boolean; setOpen: () => void }) => <></>,
//   });

//   return (
//     <ArticleItem
//       item={item}
//       ActionsRenderer={() => (
//         <>
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <Menu />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               {actions.map((action) => (
//                 <DropdownMenuItem
//                   {...(action.Modal && {
//                     onClick: () =>
//                       setOpen({
//                         open: true,
//                         Modal: action.Modal || (() => <></>),
//                       }),
//                   })}
//                 >
//                   {action.link ? (
//                     <Link href={action.link}>{action.name}</Link>
//                   ) : (
//                     action.name
//                   )}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//           {open.Modal && (
//             <open.Modal
//               open={open.open}
//               setOpen={() => setOpen({ ...open, open: !open.open })}
//             />
//           )}
//         </>
//       )}
//     />
//   );
// }

// export function CurrentlyReadingArticleMenu({
//   item,
//   onMoveToWantToRead,
//   onMoveToFinished,
//   onRemove,
// }: {
//   item: article_store & {
//     user_reads_notes: user_reads_notes[];
//   };
//   onMoveToWantToRead: (id: number) => void;
//   onMoveToFinished: (id: number) => void;
//   onRemove: (id: number) => void;
// }) {
//   return (
//     <ArticleItem
//       item={item}
//       ActionsRenderer={() => (
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <Button variant="ghost">
//               <Menu />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuItem>
//               <Link href={`/read/${item.recordid}`}>View Article</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               <Link href={`/read/${item.recordid}/${CURRENT_USER}`}>
//                 View Notes
//               </Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onMoveToWantToRead(item.recordid)}>
//               Move to Want to Read
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onMoveToFinished(item.recordid)}>
//               Move to Finished Reading
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={() => onRemove(item.recordid)}>
//               Remove
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )}
//     />
//   );
// }

// export function ArticleWithRemoveButton({
//   item,
//   onRemove,
// }: {
//   item: article_store & {
//     user_reads_notes: user_reads_notes[];
//   };
//   onRemove: (id: number) => void;
// }) {
//   return (
//     <ArticleItem
//       item={item}
//       ActionsRenderer={() => (
//         <Button variant="ghost" onClick={() => onRemove(item.recordid)}>
//           -
//         </Button>
//       )}
//     />
//   );
// }
