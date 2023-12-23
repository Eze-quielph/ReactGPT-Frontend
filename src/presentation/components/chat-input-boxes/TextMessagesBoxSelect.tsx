import { FormEvent, useState } from "react";

interface Props {
  onSendMessages: (message: string, seletedOption: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessagesBoxSelect = ({
  onSendMessages,
  placeholder = "",
  disableCorrections = false,
  options,
}: Props) => {
  const [message, setMessage] = useState<string>("");
  const [seletedOption, setSeletedOption] = useState<string>("");
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim().length === 0) return;
    onSendMessages(message, seletedOption);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className=" flex">
          <input
            type="text"
            placeholder={
              placeholder.length > 0 ? placeholder : "Ingrese su texto"
            }
            autoFocus
            name="message"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            value={seletedOption}
            onChange={(e) => setSeletedOption(e.target.value)}
          >
            <option value="">Seleccione</option>
            {options.map(({ id, text }) => (
              <option id={id} value={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ml-4">
        <button type="submit" className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};
