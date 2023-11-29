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
    <div className="p-8 flex bg-gradient-to-r to-green-500 from-green-400 rounded-full">
      <Input
      className="ring-2 ring-white text-white border-0 placeholder:text-white"
        type="text"
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
        disabled={input.length < 2}
        className="ml-4 flex-none text-black bg-white px-16"
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
      >
        {isLoading ? <Spinner /> : "Ask"}
      </Button>
    </div>
  );
}
