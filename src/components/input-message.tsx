import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type InputMessageProps = {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (value: string) => void;
  placeholder: string;
  isLoading: boolean;
};

export function InputMessage({
  input,
  setInput,
  sendMessage,
  placeholder,
  isLoading,
}: InputMessageProps) {
  return (
    <div className=" flex w-full items-center rounded-md bg-slate-200 p-2 dark:bg-slate-900">
      <Input
        className="ring-2 ring-white text-black border-0 placeholder:text-black dark:placeholder-white dark:text-white bg-transparent w-full focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-colors duration-300 ease-in-out"
        type="text"
        autoComplete="on"
        aria-label="chat input"
        required
        placeholder={placeholder}
        value={input}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
            setInput("");
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <Button
        type="submit"
        // disabled={inp/ut.length < 10}
        className="ml-4  bg-black dark:bg-slate-800 text-white dark:text-white border-0 rounded-md px-4 py-2 hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors duration-300 ease-in-out w-64"
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
      >
        {isLoading ? <Spinner /> : "Ask Your Question"}
      </Button>
    </div>
  );
}
