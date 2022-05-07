require 'rails_helper'

RSpec.describe LocationResource, type: :resource do
  describe 'creating' do
    let(:payload) do
      {
        data: {
          type: 'locations',
          attributes: attributes_for(:location)
        }
      }
    end

    let(:instance) do
      LocationResource.build(payload)
    end

    it 'works' do
      expect {
        expect(instance.save).to eq(true), instance.errors.full_messages.to_sentence
      }.to change { Location.count }.by(1)
    end
  end

  describe 'updating' do
    let!(:location) { create(:location) }

    let(:payload) do
      {
        data: {
          id: location.id.to_s,
          type: 'locations',
          attributes: { } # Todo!
        }
      }
    end

    let(:instance) do
      LocationResource.find(payload)
    end

    xit 'works (add some attributes and enable this spec)' do
      expect {
        expect(instance.update_attributes).to eq(true)
      }.to change { location.reload.updated_at }
      # .and change { location.foo }.to('bar') <- example
    end
  end

  describe 'destroying' do
    let!(:location) { create(:location) }

    let(:instance) do
      LocationResource.find(id: location.id)
    end

    it 'works' do
      expect {
        expect(instance.destroy).to eq(true)
      }.to change { Location.count }.by(-1)
    end
  end
end
