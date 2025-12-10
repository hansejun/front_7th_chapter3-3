import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useModalStore } from "./modal.store"

export const ModalRoot = () => {
  const { modals, closeModal } = useModalStore()

  // ESC 키로 최상위 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modals.length > 0) {
        closeModal() // id 없이 호출하면 최상위 모달 닫기
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [modals.length, closeModal])

  if (modals.length === 0) return null

  return createPortal(
    <>
      {modals.map((modal, index) => {
        const Component = modal.component
        return (
          <div
            key={modal.id}
            style={{
              position: "fixed",
              zIndex: 1000 + index * 10,
            }}
          >
            <Component {...modal.props} />
          </div>
        )
      })}
    </>,
    document.body
  )
}
