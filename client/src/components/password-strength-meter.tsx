import { useState, useEffect } from "react";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import { dictionary } from "@zxcvbn-ts/language-common";

// Initialize zxcvbn with common dictionary
zxcvbnOptions.setOptions({
  dictionary: {
    ...dictionary,
  },
});

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setStrength(result.score);
      setFeedback(result.feedback.warning || result.feedback.suggestions[0] || "");
    } else {
      setStrength(0);
      setFeedback("");
    }
  }, [password]);

  const getStrengthColor = () => {
    switch (strength) {
      case 0:
        return "bg-destructive";
      case 1:
        return "bg-destructive/70";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500/70";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 0:
        return "Very Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: `${(strength + 1) * 20}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{getStrengthText()}</span>
        {feedback && <span>{feedback}</span>}
      </div>
    </div>
  );
}
