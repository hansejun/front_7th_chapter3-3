import { ComponentType } from "react"
import { create } from "zustand"
import { BaseModalProps, ModalState } from "./types"

interface ModalStore {
  modals: ModalState[]
  openModal: <P extends BaseModalProps>(component: ComponentType<P>, props: Omit<P, "onCloseModal">) => string
  closeModal: (id?: string) => void
  closeAll: () => void
}

let modalIdCounter = 0
const generateModalId = () => `modal-${++modalIdCounter}`

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],

  openModal: (component, props) => {
    const id = generateModalId()

    set((state) => ({
      modals: [
        ...state.modals,
        {
          id,
          component: component as ComponentType<BaseModalProps>,
          props: {
            ...props,
            onCloseModal: () => get().closeModal(id),
          } as BaseModalProps & Record<string, unknown>,
        },
      ],
    }))

    return id
  },

  closeModal: (id) => {
    set((state) => {
      // id가 없으면 최상위(마지막) 모달 닫기
      if (!id) {
        return {
          modals: state.modals.slice(0, -1),
        }
      }

      // 특정 id의 모달 닫기
      return {
        modals: state.modals.filter((modal) => modal.id !== id),
      }
    })
  },

  closeAll: () => {
    set({ modals: [] })
  },
}))
