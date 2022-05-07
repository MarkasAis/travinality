require 'rails_helper'

RSpec.describe LocationResource, type: :resource do
  describe 'serialization' do
    let!(:location) { create(:location) }

    it 'works' do
      render
      data = jsonapi_data[0]
      expect(data.id).to eq(location.id)
      expect(data.jsonapi_type).to eq('locations')
    end
  end

  describe 'filtering' do
    let!(:location1) { create(:location) }
    let!(:location2) { create(:location) }

    context 'by id' do
      before do
        params[:filter] = { id: { eq: location2.id } }
      end

      it 'works' do
        render
        expect(d.map(&:id)).to eq([location2.id])
      end
    end
  end

  describe 'sorting' do
    describe 'by id' do
      let!(:location1) { create(:location) }
      let!(:location2) { create(:location) }

      context 'when ascending' do
        before do
          params[:sort] = 'id'
        end

        it 'works' do
          render
          expect(d.map(&:id)).to eq([
            location1.id,
            location2.id
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
            location2.id,
            location1.id
          ])
        end
      end
    end
  end

  describe 'sideloading' do
    # ... your tests ...
  end
end
