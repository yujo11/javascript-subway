import Component from '../../core/Component.js';
import { sectionListTemplate, sectionsTemplate } from './template.js';
import { $, customConfirm, showSnackbar } from '../../utils/index.js';
import { MESSAGE, SNACKBAR_MESSAGE } from '../../constants/index.js';
import { service } from '../../service/index.js';

export default class Sections extends Component {
  #lineId;
  constructor() {
    super();
    this.#lineId;
  }

  selectDOM() {
    this.$modal = $('.modal');
    this.$modalForm = $('#modal-form');
    this.$modalCloseButton = $('#modal-close-button');
    this.$lineSelect = $('#line-select');
    this.$sectionListContainer = $('#section-list-container');
    this.$createSectionButton = $('.create-section-btn');
    this.$sectionContainer = $('.sections-container');
  }

  bindEvent() {
    this.$lineSelect.addEventListener('change', this.handleLineSelect.bind(this));
    this.$createSectionButton.addEventListener('click', this.handleModalOpen.bind(this));
    this.$modalCloseButton.addEventListener('click', this.handleModalClose.bind(this));
    this.$modalForm.addEventListener('submit', this.handleSectionForm.bind(this));
    this.$sectionContainer.addEventListener('click', this.handleSectionDelete.bind(this));
  }

  async handleSectionDelete({ target }) {
    if (!target.classList.contains('section-delete-button')) {
      return;
    }

    const $sectionListItem = target.closest('.section-list-item');
    const stationName = $sectionListItem.querySelector('.section-name').innerText;
    const stationId = target.dataset.id;

    const confirm = await customConfirm(MESSAGE.DELETE_CONFIRM(stationName));

    if (!confirm) {
      return;
    }

    const isDeleted = await service.deleteSection({
      lineId: this.#lineId,
      stationId,
    });

    if (!isDeleted) {
      showSnackbar(SNACKBAR_MESSAGE.DELETE_FAILURE);
      return;
    }

    $sectionListItem.remove();
    showSnackbar(SNACKBAR_MESSAGE.DELETE_SUCCESS);
  }

  async handleSectionForm(e) {
    e.preventDefault();

    this.#lineId = e.target.elements['modal-line-select'].value;
    const upStationId = e.target.elements['previous-station-select'].value;
    const downStationId = e.target.elements['next-station-select'].value;
    const distance = e.target.elements['distance-input'].value;
    const duration = e.target.elements['duration-input'].value;

    const createdSectionData = await service.getCreatedSectionData({
      id: this.#lineId,
      contents: { upStationId, downStationId, duration, distance },
    });

    if (!createdSectionData) {
      showSnackbar(SNACKBAR_MESSAGE.CREATE_FAILURE);
      return;
    }

    showSnackbar(SNACKBAR_MESSAGE.CREATE_SUCCESS);

    this.$lineSelect.querySelector(`option[value="${this.#lineId}"]`).selected = true;

    const changeEvent = new Event('change');
    this.$lineSelect.dispatchEvent(changeEvent);
    e.target.reset();
    this.handleModalClose();
  }

  handleModalOpen() {
    this.$modal.classList.add('open');
  }

  handleModalClose() {
    this.$modal.classList.remove('open');
  }

  async handleLineSelect({ target }) {
    this.#lineId = target.value;

    const line = await service.getLineData({ id: this.#lineId });
    const stationList = line.stations;
    const sectionList = line.sections;
    const sortedSectionList = stationList.map((station, index) => {
      if (index === stationList.length - 1) return { name: station.name, id: station.id };

      const targetSection = sectionList.find((section) => station.id === section.upStation.id);

      return {
        name: targetSection.upStation.name,
        id: targetSection.upStation.id,
        color: line.color,
        duration: targetSection.duration,
        distance: targetSection.distance,
      };
    });

    this.$sectionListContainer.innerHTML = sortedSectionList.map((section) => sectionListTemplate(section)).join('');
  }

  render(stationList, lineList) {
    $('main').innerHTML = sectionsTemplate(stationList, lineList);
  }

  async load() {
    const stationList = await service.getStationList();
    const lineList = await service.getLineList();

    this.render(stationList, lineList);
    this.selectDOM();
    this.bindEvent();
  }
}
