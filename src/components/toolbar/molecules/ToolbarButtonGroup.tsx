import { ToolbarButton } from "@/components/toolbar/atoms/ToolbarButton";
import { ZeroArgTextActions, ZeroArgTextButtonConfig } from "@/components/toolbar/textConfig";

interface ToolbarButtonGroupProps {
  buttons: ZeroArgTextButtonConfig[];
  actions: ZeroArgTextActions;
  currentValue?: string | null;
}

export const ToolbarButtonGroup = ({
  buttons,
  actions,
  currentValue = null,
}: ToolbarButtonGroupProps) => {
  return (
    <div className="flex items-center">
      {buttons.map((button) => (
        <ToolbarButton
          key={button.key}
          icon={button.icon}
          tooltip={button.tooltip}
          isActive={currentValue === button.key}
          onClick={actions[button.action]}
        />
      ))}
    </div>
  );
};
