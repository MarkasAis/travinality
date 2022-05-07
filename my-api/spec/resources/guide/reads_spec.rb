require 'rails_helper'

RSpec.describe GuideResource, type: :resource do
  describe 'serialization' do
    let!(:guide) { create(:guide) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(guide.id)
      expect(data.jsonapi_type).to eq('guides')
    end
  end

  describe 'filtering' do
    let!(:guide1) { create(:guide) }
    let!(:guide2) { create(:guide) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: guide2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([guide2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:guide1) { create(:guide) }
      let!(:guide2) { create(:guide) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            guide1.id,
            guide2.id
          ])
        end
      end

      context 'when descending' do
        before do
          params[:sort] = '-id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            guide2.id,
            guide1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
