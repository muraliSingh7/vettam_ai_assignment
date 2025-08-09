import { ToolbarButton } from "@/components/toolbar/atoms/ToolbarButton";
import { ZeroArgTextActions, ZeroArgTextButtonConfig } from "@/components/toolbar/textConfig";
import { TextEditorStateSnapshot } from "@/components/toolbar/hooks/useTextToolbar";

interface ToolbarButtonGroupProps {
  buttons: ZeroArgTextButtonConfig[];
  actions: ZeroArgTextActions;
  state: TextEditorStateSnapshot | null
}

export const ToolbarButtonGroup = ({
  buttons,
  actions,
  state
}: ToolbarButtonGroupProps) => {
  return (
    <div className="flex items-center">
      {buttons.map((button) => (
        <ToolbarButton
          key={button.key}
          icon={button.icon}
          tooltip={button.tooltip}
          isActive={button.isActive?.(state) ?? false}
          onClick={actions[button.action]}
        />
      ))}
    </div>
  );
};
