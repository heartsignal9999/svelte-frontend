// src/utils/errorHandler.ts
import { statusText, recordButtonProps, } from '../stores/pageHeartSignalStore';

export function handleMicrophoneAccessError() {
    statusText.set(
      "녹음을 시작할 수 없습니다. 페이지를 새로 고침하거나 다른 기기로 권한을 승인하여 다시 시도하세요."
    );
    recordButtonProps.set({
      text: "녹음 실패",
      classes: "bg-gray-500",
      disabled: true,
    });
  }