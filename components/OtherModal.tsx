import * as Dialog from "@radix-ui/react-dialog";
import { User } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onChange?: (open: boolean) => void
    title: string;
    description: string;
    image: string;
    children: React.ReactNode;
}

const OtherModal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    image,
    children
}) => {

    return (
        <Dialog.Root
          open={isOpen}
          defaultOpen={isOpen}
          onOpenChange={onChange}
        >
          <Dialog.Portal>
            <Dialog.Overlay
              className="
                bg-neutral-900/95
                backdrop-blur-sm
                fixed
                inset-0
              "
            />
            <Dialog.Content
              className="
                fixed
                drop-shadow-md
                border
                border-neutral-700
                top-[50%]
                left-[50%]
                max-h-full
                h-full
                md:h-auto
                md:max-h-[85vh]
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                translate-y-[-50%]
                translate-x-[-50%]
                rounded-md
                bg-neutral-800
                p-[25px]
                focus:outline-none
              "
            >
              <div className="flex gap-x-4">
              <img 
                src={image}
                alt="image"
                className="w-16 h-16 rounded-xl"
              />
              <div className="flex flex-col">
                <Dialog.Title
                  className="
                    text-xl
                    font-bold
                    mb-2
                    text-white
                  "
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description
                  className="
                    mb-5
                    text-md
                    leading-normal
                    text-white
                  "
                >
                  {description}
                </Dialog.Description>
              </div>
              </div>
              <div>
                {children}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
    );
}

export default OtherModal;