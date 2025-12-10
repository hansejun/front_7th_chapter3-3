import { useModalStore } from "@shared/store/modal/modal.store"

/**
 * 모달을 관리하는 hook
 *
 * @example
 * const { openModal } = useModal()
 *
 * openModal(AddPostModal, {
 *   newPost,
 *   onAddPost: addPost,
 *   onPostChange: setNewPost,
 * })
 */
export const useModal = () => {
  const { openModal, closeModal, closeAll, modals } = useModalStore()

  return {
    /** 새 모달을 엽니다. 고유 ID를 반환합니다. */
    openModal,
    /** 특정 모달을 닫습니다. id가 없으면 최상위 모달을 닫습니다. */
    closeModal,
    /** 모든 모달을 닫습니다. */
    closeAll,
    /** 현재 열린 모달 목록 */
    modals,
  }
}
