import { ComponentType } from "react"

/**
 * 모든 모달이 반드시 받아야 하는 기본 Props
 */
export interface BaseModalProps {
  onCloseModal: () => void
}

/**
 * 모달 스택의 개별 아이템
 */
export interface ModalState {
  id: string
  component: ComponentType<any>
  props: Record<string, any>
}
