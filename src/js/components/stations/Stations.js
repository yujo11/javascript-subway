import Component from '../../core/Component.js';
import { stationsTemplate, stationListTemplate } from './template.js';
import { $, showSnackbar, customConfirm } from '../../utils/index.js';
import { MESSAGE, SNACKBAR_MESSAGE, STATIONS } from '../../constants/index.js';
import { service } from '../../service/service';

export default class Stations extends Component {
  constructor() {
    super();
  }

  selectDOM() {
    this.$stationInputForm = $('#station-input-form');
    this.$stationListContainer = $('#station-list-container');

    this.$stationEditModal = $('#station-edit-modal');
    this.$stationEditNameInput = $('#station-edit-name-input');
    this.$stationEditModalClose = $('.modal-close');
  }

  bindEvent() {
    this.$stationInputForm.addEventListener('submit', this.handleStationInputForm.bind(this));
    this.$stationEditModalClose.addEventListener('click', this.handleStationEditModalClose.bind(this));
    this.$stationEditModal.addEventListener('submit', this.handleStationEdit.bind(this));

    this.$stationListContainer.addEventListener('click', ({ target }) => {
      if (target.classList.contains('station-edit-button')) {
        this.handleStationEditModalOpen(target);
      }

      if (target.classList.contains('station-delete-button')) {
        this.handleStationDelete(target);
      }
    });
  }

  handleStationEditModalClose({ target }) {
    if (target.classList.contains('modal-close')) {
      this.$stationEditModal.classList.remove('open');
    }
  }

  async handleStationEdit(e) {
    e.preventDefault();

    const $stationEditNameInput = e.target.elements['station-edit-name-input'];
    const stationId = $stationEditNameInput.dataset.id;

    if (!this.isValidStationNameLength($stationEditNameInput.value)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_VALID_STATION_NAME_LENGTH);
      return;
    }

    if ($stationEditNameInput.value === $stationEditNameInput.placeholder) {
      this.$stationEditModal.classList.remove('open');
      return;
    }

    const isEdited = await service.editStation({
      name: $stationEditNameInput.value,
      id: stationId,
    });

    if (!isEdited) {
      showSnackbar(SNACKBAR_MESSAGE.EDIT_FAILURE);
    }

    this.$stationEditModal.classList.remove('open');
    $(`.station-name[data-id="${stationId}"]`).innerText = $stationEditNameInput.value;
    $stationEditNameInput.value = '';
    showSnackbar(SNACKBAR_MESSAGE.EDIT_SUCCESS);
  }

  handleStationEditModalOpen(target) {
    const $stationListItem = target.closest('.station-list-item');
    const stationName = $stationListItem.querySelector('.station-name').innerText;

    this.$stationEditModal.classList.add('open');
    this.$stationEditNameInput.focus();
    this.$stationEditNameInput.placeholder = stationName;
    this.$stationEditNameInput.dataset.id = target.dataset.id;
  }

  async handleStationDelete(target) {
    const $stationListItem = target.closest('.station-list-item');
    const stationName = $stationListItem.querySelector('.station-name').innerText;
    const stationId = target.dataset.id;

    const confirm = await customConfirm(MESSAGE.DELETE_CONFIRM(stationName));

    if (!confirm) {
      return;
    }

    const isDeleted = await service.deleteStation({
      id: stationId,
    });

    if (!isDeleted) {
      return;
    }

    $stationListItem.remove();
    showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
  }

  isValidStationNameLength(name) {
    return STATIONS.MIN_STATION_NAME_LENGTH <= name.length && name.length <= STATIONS.MAX_STATION_NAME_LENGTH;
  }

  async handleStationInputForm(e) {
    e.preventDefault();

    const $stationNameInput = e.target.elements['station-name-input'];

    if (!this.isValidStationNameLength($stationNameInput.value)) {
      showSnackbar(SNACKBAR_MESSAGE.IS_NOT_VALID_STATION_NAME_LENGTH);
      return;
    }

    const createdStationData = await service.getCreatedStationData({
      name: $stationNameInput.value,
    });

    if (!createdStationData) {
      showSnackbar(SNACKBAR_MESSAGE.CREATE_FAILURE);
      return;
    }

    $('#station-list-container').insertAdjacentHTML('beforeend', stationListTemplate(createdStationData));
    $stationNameInput.value = '';

    showSnackbar(SNACKBAR_MESSAGE.CREATE_SUCCESS);
  }

  render(stationList = []) {
    $('main').innerHTML = stationsTemplate(stationList);
  }

  async load() {
    const stationList = await service.getStationList();

    this.render(stationList);
    this.selectDOM();
    this.bindEvent();

    $('#station-name-input').focus();
  }
}
